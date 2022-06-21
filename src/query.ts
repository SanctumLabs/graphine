Graphine.Q = {}

Graphine.query = function(graph) {
    var query = Object.create(Graphine.Q)
        
    query.graph = graph
    query.state = []
    query.program = []
    query.gremlins = []

    return query
}

Graphine.Q.add = function(pipetype, args) {
    var step = [pipetype, args]
    this.program.push(step)
    return this
}

Graphine.Q.v = function() {
    var query = Graphine.query(this)
    query.add('vertex', [].slice.call(arguments))
    return query
}


