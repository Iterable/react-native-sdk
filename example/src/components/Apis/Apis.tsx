import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Route } from '../../constants';
import ApiDetail from './ApiDetails';
import ApiList from './ApiList';

const Stack = createNativeStackNavigator();

export const Apis = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Route.ApiList} component={ApiList} />
      <Stack.Screen
        name={Route.ApiDetail}
        component={ApiDetail}
        options={({ route }) => ({ title: route.params.item?.value })}
      />
    </Stack.Navigator>
  );
};

export default Apis;
