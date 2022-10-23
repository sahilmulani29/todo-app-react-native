import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, fireEvent,screen } from '@testing-library/react-native';
import ToDo from '../../components/todos/ToDo';
import '@testing-library/jest-dom';

describe('Todo Test Cases' , ()=>{

    const mockStore = configureStore({});
    const intial_state = {
        'TodoReducer' : ['Painting' , 'Bike Servicing' , 'Super Market']
    }

    beforeEach(()=>{
        store = mockStore(intial_state);
    })

    it('ToDo Should Be present', () => {
        store.dispatch = jest.fn();
        const { container } = render(
        <Provider store={store}>
            <ToDo />
        </Provider>
        );
        expect(container).toBeTruthy();
    });

    it('Should Display List', () => {
        store.dispatch = jest.fn();
        const { getByText } = render(
        <Provider store={store}>
            <ToDo />
        </Provider>
        );
        expect(getByText("Painting")).toBeTruthy();
    });

    it("Should add Todos", async () => {
        const { findByTestId, getByText } = render(
            <Provider store={store}>
                <ToDo />
            </Provider>
        );
        const element = screen.getByPlaceholderText('Things to do');
        fireEvent.changeText(element , 'Bike Servicing')
        const button = await findByTestId("button");
        fireEvent.press(button);
        expect(getByText("Bike Servicing")).toBeTruthy();
    });
    

})