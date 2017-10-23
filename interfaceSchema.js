const {
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLEnumType,
    GraphQLNonNull,
    GraphQLInterfaceType,
    GraphQLInputObjectType
} = require('graphql')

const Animal = new GraphQLInterfaceType({
    name: 'Animal',
    description: '接口',
    fields(){
        return {
            name: {
                type: new GraphQLNonNull(GraphQLString)
            }
        }
    },
    resolveType(obj){
        if(obj.legs){
            return Dog
        }else if(obj.tailColor){
            return Fish
        }else {
            return null
        }
    }
})

const Dog = new GraphQLObjectType({
    name: 'Dog',
    interfaces: [Animal],
    description: '狗狗',
    fields(){
        return {
            name: {type: new GraphQLNonNull(GraphQLString)},
            legs: {type: new GraphQLNonNull(GraphQLInt)}
        }
    },
    isTypeOf: obj=>obj.legs
})
const Fish = new GraphQLObjectType({
    name: 'Fish',
    interfaces: [Animal],
    description: '鱼儿',
    fields(){
        return {
            name: {type: new GraphQLNonNull(GraphQLString)},
            tailColor: {type: new GraphQLNonNull(GraphQLString)}
        }
    },
    isTypeOf: obj=>obj.tailColor
})

const animals = [
    {
        name: 'dog',
        legs: 4
    },
    {
        name: 'fish',
        tailColor: 'red'
    }
];

const Query = new GraphQLObjectType({
    name: 'AnimalQuery',
    description: '动物信息查询',
    fields(){
        return {
            animals: {
                type: new GraphQLList(Animal),
                description: '查询全部动物列表',
                resolve(){
                    return animals
                }
            },
            animalSearch: {
                type: Animal,
                args: {
                    text: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve(source, {text}){
                    if(text==='dog'){
                        return animals[0]
                    }else{
                        return animals[1]
                    }
                }
            }
        }
    }
})

const schema = new GraphQLSchema({
    types: [Dog,Fish,Animal],
    query: Query
})

module.exports = schema