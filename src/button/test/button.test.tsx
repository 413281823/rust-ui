import { render, fireEvent } from '@testing-library/vue'
import Button from '../src/button'

//基础按钮
test('it should work', () => {
  const { getByRole } = render(Button)
  getByRole('button')
})
//测试默认插槽
test('default slot shold be 按钮', () => {
  const { getByText } = render(Button)
  getByText('按钮')
})
//测试插槽传入
test('default slot shold be work', () => {
  const { getByText } = render(Button, {
    slots: {
      default: 'yes'
    }
  })
  getByText('yes')
})
//按钮类型
test('default type should be secondary', () => {
  // 默认secondary
  const { getByRole } = render(Button)
  const button = getByRole('button')
  expect(button.classList.contains('s-btn--secondary')).toBe(true)
})

test('type should work', () => {
  const { getByRole } = render(Button, {
    props: {
      type: 'primary'
    }
  })
  const button = getByRole('button')
  expect(button.classList.contains('s-btn--primary')).toBe(true)
})

test('default size should be medium', () => {
  const { getByRole } = render(Button)
  const button = getByRole('button')
  expect(button.classList.contains('s-btn--medium')).toBe(true)
})
test('size should work', () => {
  const { getByRole } = render(Button, {
    props: {
      type: 'large'
    }
  })
  const button = getByRole('button')
  expect(button.classList.contains('s-btn--large')).toBe(true)
})
test('block should work', () => {
  const { getByRole } = render(Button, {
    props: {
      block: true
    }
  })
  const button = getByRole('button')
  expect(button.classList.contains('s-btn--block')).toBe(true)
})
