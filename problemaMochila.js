const itens = [
    {weight: 1, value: 6},
    {weight: 2, value: 10},
    {weight: 3, value: 12},
    {weight: 4, value: 15},
    {weight: 5, value: 20}
];

const capacity = 10;

function calculateEfficiency(itens, capacity) {
    itens = itens.map(item => ({
        weight: item.weight,
        value: item.value,
        efficiency: item.value / item.weight
    }));

    itens.sort((a, b) => b.efficiency - a.efficiency);

    let totalValue = 0;
    let currentWeight = 0;
    let selectedItems = [];

    for (let item of itens) {
        if (currentWeight + item.weight <= capacity) {
            selectedItems.push({...item, amount: 1});
            currentWeight += item.weight;
            totalValue += item.value;
        } else {           
            let amount = (capacity - currentWeight) / item.weight;
            selectedItems.push({...item, amount: amount});
            totalValue += item.value * amount; 
            break; // Capacidade atingida
        }
    }

    return {totalValue, selectedItems};
}

const result = calculateEfficiency(itens, capacity);
console.log("Valor Total:", result.totalValue.toFixed(2));
console.log("Itens Selecionados:");
result.selectedItems.forEach(item => {
    console.log(`Item: Valor ${item.value}, Peso ${item.weight}, Quantidade ${item.amount.toFixed(2)}`);
});
