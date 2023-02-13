export const currencyFormat = new Intl.NumberFormat(undefined, {
    currency: "INR",
    style: "currency",
    minimumFractionDigits: 0
})



export const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const monthInNum = ["01","02","03","04","05","06","07","08","09","10","11","12"]


export const baseUrl = "https://budgetappapi.onrender.com";

export const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true
}