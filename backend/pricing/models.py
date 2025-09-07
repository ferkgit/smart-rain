from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class PriceList(Base):
    """A collection of related pricing items."""
    __tablename__ = 'price_lists'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False, unique=True)
    tax_included = Column(Boolean, default=False)

    items = relationship('PriceItem', back_populates='price_list', cascade='all, delete-orphan')


class PriceItem(Base):
    """Individual items that belong to a price list."""
    __tablename__ = 'price_items'

    id = Column(Integer, primary_key=True)
    price_list_id = Column(Integer, ForeignKey('price_lists.id'), nullable=False)
    name = Column(String, nullable=False)
    item_group = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    tax_rate = Column(Float, default=0.0)

    price_list = relationship('PriceList', back_populates='items')
