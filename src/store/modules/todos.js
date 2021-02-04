import axios from 'axios'

const state = {
    todos: [

    ]
}

const getters = {
    allTodos: (state) => state.todos
}

const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
        commit('setTodos', response.data)
    },

    async addTodo({ commit }, title) {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', { title, completed: false })
        commit('newTodo', response.data)
    },

    deleteTodo({ commit }, id) {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        commit('removeTodo', id)
    },

    async filterTodos({ commit }, event) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${event.target.value}`)
        commit('setTodos', response.data)
    },

    async updateTodo({ commit }, todo) {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, todo)
        commit('updateTodo', response.data)
    }

}

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(item => item.id !== id),
    updateTodo: (state, todo) => state.todos = state.todos.map(item => {
        return item.id === todo.id ? todo : item
    })
}

export default {
    state,
    getters,
    actions,
    mutations
}