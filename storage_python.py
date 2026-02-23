def crop_storage_system():
    # Space required per kg (in cubic feet)
    density = {
        "tomato": 0.12,   # requires more space
        "potato": 0.06,
        "onion": 0.05
    }

    # Best practices for each crop
    recommendations = {
        "tomato": [
            "Store at 10–15°C",
            "Maintain 85–95% humidity",
            "Keep only 2–3 layers – avoid crushing",
            "Use ventilated plastic crates"
        ],
        "potato": [
            "Store at 4–10°C",
            "Keep away from light to avoid greening",
            "Ensure good airflow",
            "Avoid moisture accumulation"
        ],
        "onion": [
            "Store at 0–5°C",
            "Maintain low humidity (65–75%)",
            "Use mesh bags or ventilated racks",
            "Do NOT store near potatoes"
        ]
    }

    # Take storage dimensions
    length = float(input("Enter storage length (ft): "))
    width = float(input("Enter storage width (ft): "))
    height = float(input("Enter storage height (ft): "))

    total_volume = length * width * height

    # Ask farmer which crop they want to store
    crop = input("Enter the crop you want to store (tomato/potato/onion): ").lower()

    if crop not in density:
        print("❌ Invalid crop! Please enter tomato, potato, or onion.")
        return

    # Calculate max weight that can be stored
    capacity_kg = round(total_volume / density[crop], 2)

    # Output report
    print("\n======== STORAGE ANALYSIS REPORT ========")
    print(f"Selected Crop           : {crop.capitalize()}")
    print(f"Available Volume        : {total_volume} cubic ft")
    print(f"Maximum Storage Capacity: {capacity_kg} kg")

    print("\n======== BEST STORAGE MEASURES =========")
    for tip in recommendations[crop]:
        print(f"• {tip}")


# Run the system
crop_storage_system()
