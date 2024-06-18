"""data

Revision ID: 41d983e5a5da
Revises: df4e066db9dc
Create Date: 2024-06-18 02:30:54.103628

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '41d983e5a5da'
down_revision: Union[str, None] = 'df4e066db9dc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

from app.config import HASHED_SUPERADMIN_PASSWORD


def upgrade() -> None:
    meta = sa.MetaData()

    users_tbl = sa.Table('users', meta, autoload_with=op.get_bind())
    op.bulk_insert(users_tbl, [
        {"name": "SuperAdmin", "email": "super@admin.com", "password": HASHED_SUPERADMIN_PASSWORD, "is_admin": 1},
    ])
    
    products_tbl = sa.Table('products', meta, autoload_with=op.get_bind())
    op.bulk_insert(products_tbl, [
        {"name": "iPhone 15", "category_id": 1, "price": 150000.00, "description": "Latest Apple phone", "rating": 5.00, "features": "{\n    \"display_size\": \"6.1\",\n    \"display_res\": \"1920x1080p\",\n    \"display_panel\": \"ips\",\n    \"ram\": \"8GB\",\n    \"battery_capacity\": \"3800mAh\",\n    \"camera_pixel\": \"4k\",\n    \"max_charge_capacity\": \"30w\",\n    \"image\":\"https://static0.pocketlintimages.com/wordpress/wp-content/uploads/2023/09/apple-iphone-15-pro-square-tag.jpg\"\n  }"},
        {"name": "Galaxy S22", "category_id": 1, "price": 120000.00, "description": "Flagship Samsung phone", "rating": 4.75, "features": "{\n    \"display_size\": \"6.2\",\n    \"display_res\": \"2340x1080p\",\n    \"display_panel\": \"amoled\",\n    \"ram\": \"8GB\",\n    \"battery_capacity\": \"4000mAh\",\n    \"camera_pixel\": \"8k\",\n    \"max_charge_capacity\": \"25w\",\n    \"image\":\"https://static0.anpoimages.com/wordpress/wp-content/uploads/2023/03/samsung-galaxy-s22-ultra-square.png\"\n  }"},
        {"name": "Pixel 7", "category_id": 1, "price": 110000.00, "description": "Google's latest phone", "rating": 4.50, "features": "{\n    \"display_size\": \"6.3\",\n    \"display_res\": \"2400x1080p\",\n    \"display_panel\": \"oled\",\n    \"ram\": \"8GB\",\n    \"battery_capacity\": \"4100mAh\",\n    \"camera_pixel\": \"4k\",\n    \"max_charge_capacity\": \"30w\",\n    \"image\":\"https://static0.anpoimages.com/wordpress/wp-content/uploads/2023/04/pixel-7-pro-hazel-render-square.jpg\"\n  }"},
        {"name": "OnePlus 10 Pro", "category_id": 1, "price": 130000.00, "description": "High-end OnePlus phone", "rating": 4.60, "features": "{\n    \"display_size\": \"6.7\",\n    \"display_res\": \"3216x1440p\",\n    \"display_panel\": \"amoled\",\n    \"ram\": \"12GB\",\n    \"battery_capacity\": \"5000mAh\",\n    \"camera_pixel\": \"8k\",\n    \"max_charge_capacity\": \"65w\",\n    \"image\":\"https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-10-pro-1.jpg\"\n  }"},
        {"name": "Mi 12", "category_id": 1, "price": 90000.00, "description": "Xiaomi's premium phone", "rating": 4.40, "features": "{\n    \"display_size\": \"6.28\",\n    \"display_res\": \"2400x1080p\",\n    \"display_panel\": \"oled\",\n    \"ram\": \"8GB\",\n    \"battery_capacity\": \"4500mAh\",\n    \"camera_pixel\": \"4k\",\n    \"max_charge_capacity\": \"67w\",\n    \"image\":\"https://ae01.alicdn.com/kf/S73f2bc0c48c64b858df0d19f4b8e560eJ.jpg_640x640Q90.jpg_.webp\"\n  }"},
        { "name": "MacBook Pro 16", "category_id": 2, "price": 250000.00, "description": "Apple's powerful laptop", "rating": 4.90, "features": "{ \"display_size\": \"16.0\", \"display_res\": \"3072x1920p\", \"display_panel\": \"retina\", \"ram\": \"16GB\", \"battery_capacity\": \"100Wh\", \"cpu\": \"Apple M1 Pro\", \"gpu\": \"M1 Pro GPU\", \"storage_type\": \"SSD\", \"storage_capacity\": \"1TB\", \"image\":\"https://next-one.store/userfiles/99c63cdc-695e-4e6f-928f-85f4e6dfa7d5/gallery/macbookpro_16_inch_white_06_square_v2.png\"}" },
        { "name": "Dell XPS 15", "category_id": 2, "price": 200000.00, "description": "High-end Dell laptop", "rating": 4.80, "features": "{ \"display_size\": \"15.6\", \"display_res\": \"3840x2400p\", \"display_panel\": \"OLED\", \"ram\": \"16GB\", \"battery_capacity\": \"86Wh\", \"cpu\": \"Intel Core i7\", \"gpu\": \"NVIDIA GeForce GTX 1650 Ti\", \"storage_type\": \"SSD\", \"storage_capacity\": \"512GB\", \"image\":\"https://cdn.arstechnica.net/wp-content/uploads/2022/09/IMG_0429.jpeg\"}" },
        { "name": "HP Spectre x360", "category_id": 2, "price": 180000.00, "description": "Premium HP convertible", "rating": 4.70, "features": "{ \"display_size\": \"13.3\", \"display_res\": \"1920x1080p\", \"display_panel\": \"IPS\", \"ram\": \"8GB\", \"battery_capacity\": \"60Wh\", \"cpu\": \"Intel Core i5\", \"gpu\": \"Intel Iris Xe\", \"storage_type\": \"SSD\", \"storage_capacity\": \"256GB\", \"image\":\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2-hJ8pjzGI8OkiwtxwRDn6XKX2lxbvdQ9gQ&s\"}" },
        { "name": "Lenovo ThinkPad X1 Carbon", "category_id": 2, "price": 220000.00, "description": "Business laptop from Lenovo", "rating": 4.85, "features": "{ \"display_size\": \"14.0\", \"display_res\": \"2560x1440p\", \"display_panel\": \"IPS\", \"ram\": \"16GB\", \"battery_capacity\": \"57Wh\", \"cpu\": \"Intel Core i7\", \"gpu\": \"Intel UHD Graphics\", \"storage_type\": \"SSD\", \"storage_capacity\": \"512GB\", \"image\":\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSB_eDuB_t13D_IDU-mui3Uah5WjBQkXWY8w&s\"}" },
        { "name": "Asus ROG Zephyrus G14", "category_id": 2, "price": 210000.00, "description": "Gaming laptop from Asus", "rating": 4.75, "features": "{ \"display_size\": \"14.0\", \"display_res\": \"2560x1440p\", \"display_panel\": \"IPS\", \"ram\": \"16GB\", \"battery_capacity\": \"76Wh\", \"cpu\": \"AMD Ryzen 9\", \"gpu\": \"NVIDIA GeForce RTX 3060\", \"storage_type\": \"SSD\", \"storage_capacity\": \"1TB\", \"image\":\"https://www.startech.com.bd/image/cache/catalog/laptop/asus/rog-zephyrus-g14-ga403uv/rog-zephyrus-g14-ga403uv-01-500x500.webp\"}" },
        { "name": "iPad Pro 12.9", "category_id": 3, "price": 110000.00, "description": "Apple's premium tablet", "rating": 4.90, "features": "{ \"display_size\": \"12.9\", \"display_res\": \"2732x2048p\", \"display_panel\": \"Liquid Retina\", \"ram\": \"8GB\", \"battery_capacity\": \"9720mAh\", \"cpu\": \"Apple M1\", \"gpu\": \"M1 GPU\", \"storage_type\": \"SSD\", \"storage_capacity\": \"512GB\", \"image\":\"https://ik.imagekit.io/vrvrse60f/chrisco/tr:w-568,h-568,q-80/2024/favourites-2024/6205SG_square.jpg\"}" },
        { "name": "Samsung Galaxy Tab S8", "category_id": 3, "price": 90000.00, "description": "High-end Samsung tablet", "rating": 4.80, "features": "{ \"display_size\": \"11.0\", \"display_res\": \"2560x1600p\", \"display_panel\": \"Super AMOLED\", \"ram\": \"8GB\", \"battery_capacity\": \"8000mAh\", \"cpu\": \"Snapdragon 888\", \"gpu\": \"Adreno 660\", \"storage_type\": \"UFS 3.1\", \"storage_capacity\": \"256GB\", \"image\":\"https://cdn.mos.cms.futurecdn.net/ZhMyVV8iAo9dWGTU3iLQGb-320-80.jpg\"}" },
        { "name": "Microsoft Surface Pro 8", "category_id": 3, "price": 100000.00, "description": "Microsoft's versatile tablet", "rating": 4.85, "features": "{ \"display_size\": \"13.0\", \"display_res\": \"2880x1920p\", \"display_panel\": \"PixelSense\", \"ram\": \"16GB\", \"battery_capacity\": \"6000mAh\", \"cpu\": \"Intel Core i7\", \"gpu\": \"Intel Iris Xe\", \"storage_type\": \"SSD\", \"storage_capacity\": \"512GB\", \"image\":\"https://media-cdn.bnn.in.th/168738/Microsoft-Surface-Pro8-i5-Thai-Graphite-(8PT-00032)-1-square_medium.jpg\"}" },
        { "name": "Lenovo Tab P11 Pro", "category_id": 3, "price": 60000.00, "description": "Lenovo's premium tablet", "rating": 4.70, "features": "{ \"display_size\": \"11.5\", \"display_res\": \"2560x1600p\", \"display_panel\": \"OLED\", \"ram\": \"6GB\", \"battery_capacity\": \"8600mAh\", \"cpu\": \"Snapdragon 730G\", \"gpu\": \"Adreno 618\", \"storage_type\": \"eMMC 5.1\", \"storage_capacity\": \"128GB\", \"image\":\"https://static0.anpoimages.com/wordpress/wp-content/uploads/2023/06/oneplus-pad-square.jpg\"}" },
        { "name": "Huawei MatePad Pro", "category_id": 3, "price": 80000.00, "description": "High-end Huawei tablet", "rating": 4.75, "features": "{ \"display_size\": \"10.8\", \"display_res\": \"2560x1600p\", \"display_panel\": \"IPS\", \"ram\": \"8GB\", \"battery_capacity\": \"7250mAh\", \"cpu\": \"Kirin 990\", \"gpu\": \"Mali-G76 MP16\", \"storage_type\": \"SSD\", \"storage_capacity\": \"256GB\", \"image\":\"https://media-cdn.bnn.in.th/369301/Huawei-MatePad-Pro-Wi-Fi-green-3-square_medium.jpg\"}" }
    ])

    categories_tbl = sa.Table('categories', meta, autoload_with=op.get_bind())
    op.bulk_insert(categories_tbl, [
        {"name": "Phone", "rating_params": "camera, battery, performance, display, build", "config_params": "display_size, display_res, display_panel, ram, battery_capacity, camera_pixel, max_charge_capacity"},
        {"name": "Laptop", "rating_params": "performance, display, battery, build, keyboard", "config_params": "display_size, display_res, display_panel, ram, battery_capacity, cpu, gpu, storage_type, storage_capacity"},
        {"name": "Tablet", "rating_params": "performance, display, battery, build, camera", "config_params": "display_size, display_res, display_panel, ram, battery_capacity, cpu, gpu, storage_type, storage_capacity"},
    ])

def downgrade() -> None:
    meta = sa.MetaData()

    op.execute("DELETE FROM comments")
    op.execute("DELETE FROM products")
    op.execute("DELETE FROM categories")
    op.execute("DELETE FROM sessions")
    op.execute("DELETE FROM users")

