import TodosAPI from './todos';

export default (api) => {
    TodosAPI(api);

    api.get('/', (request, response, next) => {
        response.send({
            message: 'All your todos are belong to us.'
        });
        next();
    });
};
