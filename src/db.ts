interface Graphine {}

Graphine.G = {}

Graphine.Graph = function(v, e) {
    const graph = Object.create(Graphine.G)

    graph.edges = []
    graph.vertices = []
    graph.vertexIndex = {}

    graph.autoid = 1

    if(Array.isArray(v)) graph.addVertices(v)
    if(Array.isArray(e)) graph.addEdges(e)

    return graph
}


Graphine.G.addVertices = function(vertices) { vertices.forEach(this.addVertex.bind(this))}
Graphine.G.addEdges = function(edges) {edges.forEach(this.addEdge.bind(this))}

Graphine.G.addVertex= function(vertex) {
    if(!vertex._id) {
        vertex._id = this.autoid++
    } else if(this.findVertexById(vertex._id)) {
        return Graphine.error(`Vertex with id ${vertex._id} already exists`)
    }

    this.vertices.push(vertex)
    this.vertexIndex[vertex._id] = vertex
    vertex._out = []; vertex._in = [];
    return vertex._id
}

Graphine.G.addEdge = function(edge) {
    edge._in = this.findVertexById(edge._in)
    edge._out = this.findVertexById(edge._out)

    if(!(edge._in && edge._out)) {
        Graphine.error(`That edge's ${edge._in ? 'out' : 'in'} vertex was not found`)
    }

    edge._out._out.push(edge)
    edge._in._in.push(edge)

    this.edges.push(edge)
}

Graphine.error = function(message) {
    console.error(message)
    return false
}