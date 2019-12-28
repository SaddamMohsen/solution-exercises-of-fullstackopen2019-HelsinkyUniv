import React from 'react'
//import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './simpleBlog'
import { isExportDeclaration } from 'typescript'


describe('<SimpleBlog />', () => {
    let component
    const mockHandler = jest.fn()
    const blog ={
        _id: "5a422a851b54a676234d17f7",
     title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
    }
  beforeEach(() => {
      
    component = render(
      <SimpleBlog 
       blog={blog} onClick={mockHandler}>
        <div className="testDiv" />
      </SimpleBlog>
    )
    component.debug()
  })

  test('render the blog',()=>{
      component.container.querySelector('.testDiv')
  })

  test('title and author are shown',()=>{
      
     expect(component.container).toHaveTextContent(
         "React patterns"
     )
     expect(component.container).toHaveTextContent(
         "Michael Chan"
     )
     const element= component.getByText(
         "blog has 7 likes"
     )
     expect(element).toBeDefined()

  })
  test('like button has been clicked twice',()=>{
     const button = component.container.querySelector('button')
     fireEvent.click(button)
     fireEvent.click(button)
      expect(mockHandler.mock.calls.length).toBe(2)
  })
})