import csv
import io
from .models import PriceList


def price_list_to_csv(price_list: PriceList) -> bytes:
    """Return a CSV representation of a price list and its items."""
    buffer = io.StringIO()
    writer = csv.writer(buffer)
    writer.writerow(["Item Name", "Group", "Price", "Tax Rate"])
    for item in price_list.items:
        writer.writerow([item.name, item.item_group, item.price, item.tax_rate])
    return buffer.getvalue().encode("utf-8")
