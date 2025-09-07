from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
from typing import Dict, List, Optional


class DiscountPolicy(str, Enum):
    """How multiple discount rules combine."""

    STACKING = "stacking"
    EXCLUSIVE = "exclusive"
    MAX = "max"


@dataclass(frozen=True)
class CustomerSegment:
    """Represents a segment of customers eligible for certain discounts."""

    id: str
    name: str


@dataclass(frozen=True)
class ItemGroup:
    """Groups of items a discount can target."""

    id: str
    name: str


@dataclass
class DiscountRule:
    """A rule that applies a percentage discount for a customer segment and item group."""

    id: str
    item_group: ItemGroup
    customer_segment: CustomerSegment
    percentage: float
    policy: DiscountPolicy = DiscountPolicy.STACKING
    max_discount: Optional[float] = None


@dataclass
class AuditLogEntry:
    """Represents a mutation on a discount rule."""

    rule_id: str
    action: str
    user: str
    timestamp: datetime = field(default_factory=datetime.utcnow)


class AuditLog:
    """In-memory storage of audit log entries."""

    def __init__(self) -> None:
        self.entries: List[AuditLogEntry] = []

    def record(self, rule_id: str, action: str, user: str) -> None:
        self.entries.append(AuditLogEntry(rule_id=rule_id, action=action, user=user))

    def all(self) -> List[AuditLogEntry]:
        return list(self.entries)


class DiscountRuleRepository:
    """Stores discount rules and records audit trail on changes."""

    def __init__(self, audit_log: Optional[AuditLog] = None) -> None:
        self._rules: Dict[str, DiscountRule] = {}
        self.audit_log = audit_log or AuditLog()

    def add_rule(self, rule: DiscountRule, user: str) -> None:
        self._rules[rule.id] = rule
        self.audit_log.record(rule.id, "created", user)

    def update_rule(self, rule: DiscountRule, user: str) -> None:
        self._rules[rule.id] = rule
        self.audit_log.record(rule.id, "updated", user)

    def delete_rule(self, rule_id: str, user: str) -> None:
        if rule_id in self._rules:
            del self._rules[rule_id]
            self.audit_log.record(rule_id, "deleted", user)

    def get(self, rule_id: str) -> Optional[DiscountRule]:
        return self._rules.get(rule_id)

    def list_rules(self) -> List[DiscountRule]:
        return list(self._rules.values())
