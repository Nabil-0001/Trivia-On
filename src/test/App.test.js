import { waitFor, render, screen, act } from '@testing-library/react';
import App from '../App';

test('renders title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Trivia-On!/i);
  expect(linkElement).toBeInTheDocument();
})

test('renders 4 answer buttons', async () => {
  render(<App />);
  await waitFor(() => screen.getByTestId('button1'));

  expect(screen.getByTestId('button1')).toBeInTheDocument();
  expect(screen.getByTestId('button2')).toBeInTheDocument();
  expect(screen.getByTestId('button3')).toBeInTheDocument();
  expect(screen.getByTestId('button4')).toBeInTheDocument();
})

test('renders new question after answer is selected', async () => {
  render(<App />);

  await waitFor(() => screen.getByTestId('button1'));
  const question1 = screen.getByTestId('question');
  await act(() => screen.getByTestId('button1').click());
  const question2 = screen.getByTestId('question');

  expect(question1).toEqual(question2);

})


test('renders results page after 20 questions', async () => {
  render(<App />);
  
  for(let i = 0; i < 20; i++){
    await waitFor(() => screen.getByTestId('button1'))
    await act(() => screen.getByTestId('button1').click());
  }
  const text = screen.getByText(/Done!/i);
  expect(text).toBeInTheDocument();
})


