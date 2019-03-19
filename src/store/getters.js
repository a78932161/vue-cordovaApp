/**
 * Created by Administrator on 2018/4/9.
 */
const getters = {
  id: state => state.user.id,
  token: state => state.user.token,
  storeId: state => state.user.storeId,
  name: state => state.user.name,
  roles: state => state.user.roles,
  searchValue: state => state.user.searchValue,
  active: state => state.user.active,
};

export default getters;
