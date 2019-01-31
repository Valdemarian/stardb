//ЛОГИКА ОТОБРАЖЕНИЯ ITEM-LIST - КОМПОНЕНТ ВЫСШЕГО ПОРЯДКА
import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';



const widthData = (View) => {//получаем в props компонент и данные
  return class extends Component {

    state = {
      data: null,//изначальный state пустой
      loading: true,//загрузка
      error: false//ошибка
    }

    componentDidUpdate(prevProps) {
      if (this.props.getData !== prevProps.getData){//если новые данные не равны предадущим то делаем update()
        this.update();
      }
    }

    componentDidMount(){//запрос к серверу
      this.update();//обновление данных
    }

    update(){//обновление данных
      this.setState({ 
        loading: true,
        error:false
      })
      this.props.getData()
        .then((data) => {//запрос нашего массива
          this.setState({//(обновление стате) берет старый state(data:null) и меняет его на полученный массив        
            data,
            loading: false
          });
        })
        .catch(() => {
          this.setState({ 
            error: true, 
            loading: false})
        })
    }

    render(){
      const { data, loading, error   } = this.state;//передаем в render данные из state

      if(loading){
        return <Spinner />;
      }

      if(error){
        return <ErrorIndicator />
      }

      return <View {...this.props} data={data}/>//отображаем в полученном компоненте полученные данные, 
      //передаем ему его props
    }
  }
};

export default widthData;
