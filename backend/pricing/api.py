from fastapi import APIRouter, Depends, HTTPException, Query, Response
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from typing import List, Optional
import csv
import io

from .models import Base, PriceList, PriceItem
from .export import price_list_to_csv

DATABASE_URL = "sqlite:///./pricing.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

router = APIRouter(prefix="/pricing", tags=["pricing"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# PriceList CRUD
@router.post("/lists", response_model=dict)
def create_price_list(name: str, tax_included: bool = False, db: Session = Depends(get_db)):
    price_list = PriceList(name=name, tax_included=tax_included)
    db.add(price_list)
    db.commit()
    db.refresh(price_list)
    return {"id": price_list.id, "name": price_list.name, "tax_included": price_list.tax_included}


@router.get("/lists", response_model=List[dict])
def read_price_lists(db: Session = Depends(get_db)):
    lists = db.query(PriceList).all()
    return [
        {"id": l.id, "name": l.name, "tax_included": l.tax_included}
        for l in lists
    ]


@router.put("/lists/{list_id}", response_model=dict)
def update_price_list(list_id: int, name: Optional[str] = None, tax_included: Optional[bool] = None, db: Session = Depends(get_db)):
    price_list = db.query(PriceList).get(list_id)
    if not price_list:
        raise HTTPException(status_code=404, detail="Price list not found")
    if name is not None:
        price_list.name = name
    if tax_included is not None:
        price_list.tax_included = tax_included
    db.commit()
    db.refresh(price_list)
    return {"id": price_list.id, "name": price_list.name, "tax_included": price_list.tax_included}


@router.delete("/lists/{list_id}")
def delete_price_list(list_id: int, db: Session = Depends(get_db)):
    price_list = db.query(PriceList).get(list_id)
    if not price_list:
        raise HTTPException(status_code=404, detail="Price list not found")
    db.delete(price_list)
    db.commit()
    return {"ok": True}


# PriceItem CRUD with filters
@router.post("/items", response_model=dict)
def create_price_item(price_list_id: int, name: str, item_group: str, price: float, tax_rate: float = 0.0, db: Session = Depends(get_db)):
    price_item = PriceItem(price_list_id=price_list_id, name=name, item_group=item_group, price=price, tax_rate=tax_rate)
    db.add(price_item)
    db.commit()
    db.refresh(price_item)
    return {
        "id": price_item.id,
        "price_list_id": price_item.price_list_id,
        "name": price_item.name,
        "item_group": price_item.item_group,
        "price": price_item.price,
        "tax_rate": price_item.tax_rate,
    }


@router.get("/items", response_model=List[dict])
def read_price_items(
    item_group: Optional[str] = Query(None),
    tax_included: Optional[bool] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(PriceItem).join(PriceList)
    if item_group is not None:
        query = query.filter(PriceItem.item_group == item_group)
    if tax_included is not None:
        query = query.filter(PriceList.tax_included == tax_included)
    items = query.all()
    return [
        {
            "id": i.id,
            "price_list_id": i.price_list_id,
            "name": i.name,
            "item_group": i.item_group,
            "price": i.price,
            "tax_rate": i.tax_rate,
        }
        for i in items
    ]


@router.put("/items/{item_id}", response_model=dict)
def update_price_item(
    item_id: int,
    name: Optional[str] = None,
    item_group: Optional[str] = None,
    price: Optional[float] = None,
    tax_rate: Optional[float] = None,
    db: Session = Depends(get_db),
):
    price_item = db.query(PriceItem).get(item_id)
    if not price_item:
        raise HTTPException(status_code=404, detail="Price item not found")
    if name is not None:
        price_item.name = name
    if item_group is not None:
        price_item.item_group = item_group
    if price is not None:
        price_item.price = price
    if tax_rate is not None:
        price_item.tax_rate = tax_rate
    db.commit()
    db.refresh(price_item)
    return {
        "id": price_item.id,
        "price_list_id": price_item.price_list_id,
        "name": price_item.name,
        "item_group": price_item.item_group,
        "price": price_item.price,
        "tax_rate": price_item.tax_rate,
    }


@router.delete("/items/{item_id}")
def delete_price_item(item_id: int, db: Session = Depends(get_db)):
    price_item = db.query(PriceItem).get(item_id)
    if not price_item:
        raise HTTPException(status_code=404, detail="Price item not found")
    db.delete(price_item)
    db.commit()
    return {"ok": True}


@router.get("/export/{list_id}")
def export_price_list(list_id: int, db: Session = Depends(get_db)):
    price_list = db.query(PriceList).get(list_id)
    if not price_list:
        raise HTTPException(status_code=404, detail="Price list not found")
    csv_bytes = price_list_to_csv(price_list)
    return Response(content=csv_bytes, media_type="text/csv", headers={"Content-Disposition": f"attachment; filename=price_list_{list_id}.csv"})
