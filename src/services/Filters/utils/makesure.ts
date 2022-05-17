import qs from 'qs';

export const translate = function (params) {
  const toReturn = {};

  let parsedQuery;
  if (typeof params.query === 'object') {
    parsedQuery = params.query;
  } else {
    parsedQuery = qs.parse(params.query);
  }

  // let sql_query = 'SELECT {fields} FROM '+params.tableName;
  const wheres = [];
  const sorts = [];
  let columns = '*';
  for (const key of Object.keys(parsedQuery)) {
    const val = parsedQuery[key];

    if (key == 'filter') {
      // FILTER
      for (const filterKey of Object.keys(val)) {
        const filterVal = val[filterKey];

        if (typeof filterVal === 'string') {
          // EQUAL TO
          wheres.push({
            column: filterKey,
            condition: '=',
            value: filterVal,
          });
        } else {
          for (const filterSubKey of Object.keys(filterVal)) {
            const filterSubVal = filterVal[filterSubKey];

            if (filterSubKey == 'not') {
              // [gt] GREATER THAN
              wheres.push({
                column: filterKey,
                condition: '<>',
                value: filterSubVal,
              });
            } else if (filterSubKey == 'gt') {
              // [gt] GREATER THAN
              wheres.push({
                column: filterKey,
                condition: '>',
                value: filterSubVal,
              });
            } else if (filterSubKey == 'lt') {
              // [lt] LESS THAN
              wheres.push({
                column: filterKey,
                condition: '<',
                value: filterSubVal,
              });
            } else if (filterSubKey == 'gte') {
              // [lt] GREATER THAN OR EQUAL TO
              wheres.push({
                column: filterKey,
                condition: '>=',
                value: filterSubVal,
              });
            } else if (filterSubKey == 'lte') {
              // [lt] LESS THAN OR EQUAL TO
              wheres.push({
                column: filterKey,
                condition: '<=',
                value: filterSubVal,
              });
            } else if (filterSubKey == 'in') {
              // [in] IN
              wheres.push({
                column: filterKey,
                condition: 'IN',
                value: filterSubVal,
              });
            } else if (filterSubKey == 'or_in') {
              // [in] IN
              wheres.push({
                column: filterKey,
                condition: 'OR IN',
                value: filterSubVal,
              });
            }
          }
        }
      }
    } else if (key == 'sort') {
      // SORT
      for (const sortItem of val) {
        const sortItemSplitted = sortItem.split(',');
        let sortType = 'DESC';

        if (sortItemSplitted.length > 1) {
          if (sortItemSplitted[1].toLowerCase() == 'asc') {
            sortType = 'ASC';
          }
        }

        sorts.push({
          column: sortItemSplitted[0],
          type: sortType,
        });
      }
    } else if (key == 'columns') {
      // COLUMNS
      columns = val.split(',');
    }
  }

  const easy = {
    tableName: params.tableName,
    filter: wheres,
    sorts,
    columns,
  };

  switch (params.format.toLowerCase()) {
    case 'easy':
      return easy;
    case 'sql':
      return buildSQL(easy);
  }

  return false;
};
function isNumber(n) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}

function escapeForSQL(input) {
  if (isNumber(input)) {
    return input;
  }
  return `\`${input.replace('`', '`')}\``;
}

function buildSQL(easy) {
  let sqlQuery = 'SELECT ';
  let fromVal = '*';

  // console.log(typeof easy.columns)
  if (Array.isArray(easy.columns)) {
    let columnI = 0;
    for (const column of easy.columns) {
      easy.columns[columnI] = easy.columns[columnI];
      columnI++;
    }

    fromVal = easy.columns.join();
  }

  sqlQuery += `${fromVal} FROM ${easy.tableName} `;

  if (easy.filter != null && easy.filter.length > 0) {
    sqlQuery += 'WHERE ';
    let i = 0;
    for (const whereItem of easy.filter) {
      if (i > 0) {
        sqlQuery += 'AND ';
      }

      sqlQuery += `${whereItem.column} `;
      sqlQuery += `${whereItem.condition} `;

      if (whereItem.condition.toLowerCase() == 'in') {
        let inValue = '(';

        const newInVals = [];
        for (const inVal of whereItem.value) {
          newInVals.push(escapeForSQL(inVal));
        }

        inValue += newInVals.join();

        inValue += ')';
        sqlQuery += `${inValue} `;
      } else {
        sqlQuery += `${escapeForSQL(whereItem.value)} `;
      }

      i++;
    }
  }

  // now the order by stuff
  if (easy.sorts != null && easy.sorts.length > 0) {
    sqlQuery += 'ORDER BY ';
    let iOfSort = 0;
    for (const sortItem of easy.sorts) {
      if (iOfSort > 0) {
        sqlQuery += ', ';
      }
      sqlQuery += `${sortItem.column} ${sortItem.type}`;

      iOfSort++;
    }
    sqlQuery += ' ';
  }

  return sqlQuery;
}
