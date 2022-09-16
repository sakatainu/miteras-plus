// utils
const getTotalMinutes = (timeText = '') => {
  const [hour, minute] = timeText.split(':');
  const minutes = +minute + +hour * 60;
  return isNaN(minutes) ? 0 : minutes;
};

const addCustomCell = (params) => {
  const { row, pos, content } = params;

  const cell = document.createElement('td');
  cell.classList.add('table01__cell--time');
  cell.scope = 'col';
  cell.textContent = content;
  cell.style = 'text-align: center';

  const targetCells = row.cells[pos];
  targetCells.parentNode.insertBefore(cell, targetCells.nextElementSibling);
};

const padZero = (value, count) => String(value).padStart(count, '0');


// main
const main = () => {
  const queryForHeader = '#monthly-view-attendance-content > table';
  const queryForTable = '#attendance-table-body > table';

  const tableHeaderElem = document.querySelector(queryForHeader);
  const tableElem = document.querySelector(queryForTable);

  addCustomCell({
    row: tableHeaderElem.rows[0],
    pos: 17,
    content: '客先合計',
  });

  Array.from(tableElem.rows).forEach((row) => {
    const totalWork = getTotalMinutes(row.cells[16].innerText);
    const totalInternalWork = getTotalMinutes(row.cells[17].innerText);

    const totalOuterWorkMinutes = totalWork - totalInternalWork;
    const totalOuterWorkHour = Math.floor(totalOuterWorkMinutes / 60);
    const totalOuterWorkMinute = totalOuterWorkMinutes % 60;

    const totalOuterWorkValue = `${padZero(totalOuterWorkHour, 2)}:${padZero(totalOuterWorkMinute, 2)}`;

    addCustomCell({
      row,
      pos: 17,
      content: totalOuterWorkMinutes ? totalOuterWorkValue : '',
    });
  });
};

main();
