import React, {useCallback} from 'react';
import styled from 'styled-components';
import moment from 'moment';

// HOOKS
import {useTasks} from './tasks.hooks';

// COMPONENTS
import Input from './common/Input';

const App = () => {
	const [tasks, setTasks] = useTasks();
	
	const handleKeyUp = useCallback(e => {
		if (e.which === 13) {
			setTasks([
				...tasks,
				{id: tasks.length, label: e.target.value, checked: false}
			]);
			e.target.value = '';
		}
	}, [setTasks, tasks]);
	
	const toggleChecked = useCallback(id => {
		setTasks(tasks.map(task => ({
			...task,
			checked: task.id === id ? !task.checked : task.checked
		})));
	}, [setTasks, tasks]);
	
	return (
		<Container>
			<Card>
				<Header>
					{moment().format('MMMM DD, YYYY')}
				</Header>
				
				<InputWrapper>
					<Input onKeyUp={handleKeyUp}/>
				</InputWrapper>
				
				{
					tasks.map(task => (
						<Task
							key={task.id}
							decoration={task.checked ? 'line-through' : 'none'}
							onClick={() => toggleChecked(task.id)}
						>
							{task.label}
						</Task>
					))
				}
			</Card>
		</Container>
	);
};

export default App;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  width: 400px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  box-shadow:
  0 2.8px 2.2px rgba(0, 0, 0, 0.02),
  0 6.7px 5.3px rgba(0, 0, 0, 0.028),
  0 12.5px 10px rgba(0, 0, 0, 0.035),
  0 22.3px 17.9px rgba(0, 0, 0, 0.042),
  0 41.8px 33.4px rgba(0, 0, 0, 0.05),
  0 100px 80px rgba(0, 0, 0, 0.07);
`;

const Header = styled.div`
  width: 100%;
  height: 100px;
  background: #005aff;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  color: #fff;
`;

const Task = styled.div`
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  padding: 0 20px;
  font-size: 16px;
  color: #161616;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  text-decoration: ${({decoration}) => decoration};
  cursor: pointer;
  transition: background 300ms;
  
  &:last-child {
    border: none;
  }
  
  &:hover {
    background: #fafafa;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  border-bottom: 1px solid #e0e0e0;
`;
