const compose = (...funcs) => (comp) => {
  return funcs.reduceRight(
    (wrapped, f) => f(wrapped), comp);
};

export default compose;

//Функция COMPOSE принимает в себя другие функции в качестве массива, и какой то основной элемент, 
//и оборачивает этот элемент(прогоняет результат) в переданные нами функции с права на лево(с помощью reduceRight)