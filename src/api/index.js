import TodosAPI from './todos';

export default function(api) {
    TodosAPI(api);

    api.get('/', function(request, response, next) {
        response.send({
            message: 'All your todos are belong to us.'
        });
        next();
    });
};
