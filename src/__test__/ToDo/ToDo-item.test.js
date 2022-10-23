import { render, fireEvent } from '@testing-library/react-native';
import { DELETE_ITEM_ACTION, SELECT_ITEM_ACTION } from '../../components/constant/constant';
import ToDoItem from '../../components/todos/ToDoItem';


describe('To do Item test Suit', ()=>{

    it('ToDo Should Be present', () => {
        const { container } = render(<ToDoItem todo={'Painting'}/>);
        expect(container).toBeTruthy();
    });

    it('Should call changeHandler', async()=>{
        let props = {
            onChange: jest.fn(),
            todo: 'Painting'
        };
        const { findByTestId } = render(<ToDoItem {...props}/>);
        const button = await findByTestId("onSelectItem");
        fireEvent.press(button);
        expect(props.onChange).toBeCalledWith(props.todo , SELECT_ITEM_ACTION);
    })

    it('Should call changeHandler', async()=>{
        let props = {
            onChange: jest.fn(),
            todo: 'Painting'
        };
        const { findByTestId } = render(<ToDoItem {...props}/>);
        const button = await findByTestId("onDeleteItem");
        fireEvent.press(button);
        expect(props.onChange).toBeCalledWith(props.todo , DELETE_ITEM_ACTION);
    })

})

