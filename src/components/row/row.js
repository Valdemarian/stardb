import React from 'react';

import './row.css';

//people-page react - элемент - КОМПОНЕНТ КОНТЕЙНЕР КОТОРЫЙ МОЖНО НАПОЛНИТЬ ЛЮБЫМИ ДАННЫМИ, СОСТОИТ ИЗ 2 СТОЛБОВ
const Row = ({ left, right }) => {//принимает левый блок, и правый блок,это чисто шаблон jsx разметки со стилями
  return (
      <div className="row mb2">
        <div className="col-md-6">
          {left}
        </div>
        <div className="col-md-6">
          {right}
        </div>
      </div>
  )
}

export default Row;
