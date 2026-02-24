function checkStorage() {

    const crop = document.getElementById("crop").value;
    const temp = parseFloat(document.getElementById("temp").value);
    const humidity = parseFloat(document.getElementById("humidity").value);
    const days = parseInt(document.getElementById("days").value);
    const quantity = parseFloat(document.getElementById("quantity").value);
    const space = parseFloat(document.getElementById("space").value);

    let message = "";

    // Spoilage Logic
    if (crop === "Tomato") {
        if (temp > 25 || humidity > 70 || days > 5) {
            message = "High spoilage risk. Sell immediately!";
        } else {
            message = "Storage conditions are safe.";
        }
    }

    if (crop === "Onion") {
        if (temp > 30 || humidity > 65 || days > 10) {
            message = "High spoilage risk for Onion.";
        } else {
            message = "Onion storage is safe.";
        }
    }

    if (crop === "Potato") {
        if (temp > 20 || humidity > 75 || days > 7) {
            message = "High spoilage risk for Potato.";
        } else {
            message = "Potato storage is safe.";
        }
    }

    document.getElementById("result").innerText = message;

    // Risk Percentage
    let risk = 0;
    risk += (temp / 40) * 30;
    risk += (humidity / 100) * 30;
    risk += (days / 15) * 40;

    if (risk > 100) risk = 100;
    risk = Math.round(risk);

    document.getElementById("riskPercent").innerText =
        "Spoilage Risk: " + risk + "%";

    // Market Data
    let markets = {
        Tomato: [
            { name: "Bangalore Mandi", price: 1200 },
            { name: "Mysore Market", price: 1350 },
            { name: "Hubli Market", price: 1100 }
        ],
        Onion: [
            { name: "Bangalore Mandi", price: 1500 },
            { name: "Mysore Market", price: 1700 },
            { name: "Hubli Market", price: 1600 }
        ],
        Potato: [
            { name: "Bangalore Mandi", price: 900 },
            { name: "Mysore Market", price: 1000 },
            { name: "Hubli Market", price: 950 }
        ]
    };

    let bestMarket = markets[crop][0];

    for (let i = 1; i < markets[crop].length; i++) {
        if (markets[crop][i].price > bestMarket.price) {
            bestMarket = markets[crop][i];
        }
    }

    // Profit Calculation
    let totalRevenue = bestMarket.price * quantity;

    let recommendation = "";
    if (message.includes("High")) {
        recommendation = "Recommendation: Sell Immediately for Maximum Profit.";
    } else {
        recommendation = "Recommendation: Safe to Store. Monitor Conditions.";
    }

    document.getElementById("marketResult").innerHTML =
        "Best Market: " + bestMarket.name +
        " | Price: ₹" + bestMarket.price + " per quintal<br><br>" +
        "Estimated Revenue: ₹" + totalRevenue + "<br><br>" +
        recommendation;

    // Chart
    let marketNames = markets[crop].map(m => m.name);
    let marketPrices = markets[crop].map(m => m.price);

    if (window.marketChartInstance) {
        window.marketChartInstance.destroy();
    }

    const ctx = document.getElementById("marketChart").getContext("2d");

    window.marketChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: marketNames,
            datasets: [{
                label: 'Price per Quintal (₹)',
                data: marketPrices,
                backgroundColor: ['#4CAF50', '#2196F3', '#FF9800']
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } }
        }
    });

    // Space Optimization
    let spacePerQuintal = {
        Tomato: 15,
        Onion: 12,
        Potato: 10
    };

    let requiredSpace = quantity * spacePerQuintal[crop];
    let utilization = Math.round((requiredSpace / space) * 100);

    let spaceMessage = "";

    if (requiredSpace > space) {
        spaceMessage = "Not enough storage space! Reduce quantity or expand storage.";
    } else {
        spaceMessage = "Storage space sufficient. Utilization: " + utilization + "%";
    }

    document.getElementById("spaceResult").innerText =
        "Required Space: " + requiredSpace + " cubic feet\n" +
        spaceMessage;
}s