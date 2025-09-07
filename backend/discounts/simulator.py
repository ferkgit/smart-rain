from dataclasses import asdict
from typing import List, Optional

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from .models import (
    AuditLog,
    CustomerSegment,
    DiscountPolicy,
    DiscountRule,
    DiscountRuleRepository,
    ItemGroup,
)

app = FastAPI(title="Discount Simulator")

# repository with attached audit log
repo = DiscountRuleRepository(audit_log=AuditLog())


class DiscountRulePayload(BaseModel):
    """Payload for creating or updating a discount rule."""

    id: str
    item_group: str
    customer_segment: str
    percentage: float
    policy: DiscountPolicy = DiscountPolicy.STACKING
    max_discount: Optional[float] = None
    user: str


@app.post("/rules", status_code=201)
def create_rule(payload: DiscountRulePayload):
    rule = DiscountRule(
        id=payload.id,
        item_group=ItemGroup(payload.item_group, payload.item_group),
        customer_segment=CustomerSegment(payload.customer_segment, payload.customer_segment),
        percentage=payload.percentage,
        policy=payload.policy,
        max_discount=payload.max_discount,
    )
    repo.add_rule(rule, payload.user)
    return {"status": "created"}


@app.put("/rules/{rule_id}")
def update_rule(rule_id: str, payload: DiscountRulePayload):
    rule = DiscountRule(
        id=rule_id,
        item_group=ItemGroup(payload.item_group, payload.item_group),
        customer_segment=CustomerSegment(payload.customer_segment, payload.customer_segment),
        percentage=payload.percentage,
        policy=payload.policy,
        max_discount=payload.max_discount,
    )
    repo.update_rule(rule, payload.user)
    return {"status": "updated"}


class SimulationRequest(BaseModel):
    base_price: float
    rule_ids: List[str]
    policy: DiscountPolicy
    max_total_discount: Optional[float] = None


@app.post("/simulate")
def simulate(req: SimulationRequest):
    rules: List[DiscountRule] = []
    for rid in req.rule_ids:
        rule = repo.get(rid)
        if rule is None:
            raise HTTPException(status_code=404, detail=f"Rule {rid} not found")
        rules.append(rule)

    discounts = [r.percentage for r in rules]
    if req.policy == DiscountPolicy.STACKING:
        total = sum(discounts)
    elif req.policy == DiscountPolicy.EXCLUSIVE:
        total = max(discounts, default=0)
    elif req.policy == DiscountPolicy.MAX:
        cap = req.max_total_discount or 0
        total = min(sum(discounts), cap)
    else:
        total = 0

    final_price = max(req.base_price * (1 - total / 100), 0)
    return {"final_price": round(final_price, 2)}


@app.get("/audit-log")
def read_audit_log():
    return [asdict(entry) for entry in repo.audit_log.all()]
