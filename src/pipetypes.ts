Graphine.Pipetypes = {}

Graphine.addPipetype = function(name, fn) { 
    Graphine.Pipetypes[name] = fn
    Graphine.Q[name]= function() {
        return this.add(name, [].slice.apply(arguments))
    }
}

Graphine.getPipetype = function(name) {
    var pipetype = Graphine.Pipetypes[name]

    if(!pipetype) {
        Graphine.error(`Unrecognized pipetype: ${name}`)
    }

    return pipetype || Graphine.fauxPipetype
}

Graphine.fauxPipetype = function(_, _, maybeGremlin) {
    return maybeGremlin || 'pull'
}

Graphine.addPipetype('vertex', function(graph, args, gremlin, state) {
  if(!state.vertices) {
    state.vertices = graph.findVertices(args);
  }

  if(!state.vertices.length) {
    return 'done';
  }

  var vertex = state.vertices.pop();
  return Graphine.makeGremlin(vertex, gremlin.state);
})