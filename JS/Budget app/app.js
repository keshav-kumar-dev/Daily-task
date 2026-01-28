const expenseList = [];

function setBudget(event) {
    event.preventDefault();

    //Budget Amount
    const bugtAmt = document.getElementById('setBudgetAmount').value;
    console.log(bugtAmt);

    document.getElementById('bugtAmt').value = parseFloat(bugtAmt);

    //Expense Amount
    const expenseAmt = parseFloat(document.getElementById('expAmt').value);

    //Balance Amt
    document.getElementById('balAmt').value = bugtAmt - expenseAmt;
}

function addExpense(event) {
    event.preventDefault();

    const expAmt = parseFloat(document.getElementById("addExpAmt").value);

    const category = document.getElementById("expCategory").value;

    expenseList.push({ cat: category, amount: expAmt });

    const expenseAmt = parseFloat(document.getElementById('expAmt').value) + expAmt;
    document.getElementById('expAmt').value = expenseAmt;
    const bugtAmt = parseFloat(document.getElementById('setBudgetAmount').value);

    //Balance Amt
    document.getElementById('balAmt').value = bugtAmt - expenseAmt;

    let listContainer = '';

    expenseList.forEach((exp, index)=>{
        console.log(exp.cat,1);
        
        const expense = `
             <div class="d-flex flex-row p-2 bg-white rounded-3 my-2 justify-content-between">
            <p class="fs-4 p-1">${exp.cat}</p>
            <p class="fs-4 p-1">${exp.amount}</p>
        </div>
        `;

        listContainer+=expense;
    })

    document.getElementById('expenseList').innerHTML = listContainer;


}

