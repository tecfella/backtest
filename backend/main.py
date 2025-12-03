from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf
import pandas as pd
from typing import List, Dict, Any

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Backtesting API is running"}

@app.get("/api/market-data/{symbol}")
def get_market_data(symbol: str, period: str = "1y") -> List[Dict[str, Any]]:
    """
    Fetch historical market data for a given symbol using yfinance.
    """
    try:
        ticker = yf.Ticker(symbol)
        # Fetch history
        hist = ticker.history(period=period)
        
        if hist.empty:
            raise HTTPException(status_code=404, detail=f"No data found for symbol {symbol}")
        
        # Reset index to make Date a column and convert to records
        hist.reset_index(inplace=True)
        
        # Convert to list of dicts for JSON response
        # We handle timestamp conversion to string for JSON serialization if needed, 
        # but FastAPI/Pydantic usually handles datetime objects well.
        # However, for Highcharts, we might want unix timestamps (milliseconds).
        
        data = []
        for _, row in hist.iterrows():
            data.append({
                "date": row["Date"].isoformat(),
                "timestamp": int(row["Date"].timestamp() * 1000), # Highcharts prefers ms
                "open": row["Open"],
                "high": row["High"],
                "low": row["Low"],
                "close": row["Close"],
                "volume": row["Volume"]
            })
            
        return data

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
