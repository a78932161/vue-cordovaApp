/**
 * Created by Administrator on 2018/8/22.
 */
import {removeToken} from 'common/js/auth';
import store from '../store'


function capture(error){

  let statusCode = error.gqlError.status;
  switch (statusCode){
    case 401:
      removeToken();
      this.$router.push('/login');
      this.$wu.showToast({
        title: '超时!',
        mask: false,
        duration: 2000
      });
      break;
  }
}

export default capture;
