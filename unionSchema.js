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
    GraphQLUnionType,
    GraphQLInputObjectType
} = require('graphql')

const Dog = new GraphQLObjectType({
    name: 'Dog',
    description: '狗狗实体',
    fields(){
        return {
            chinaName: {type: new GraphQLNonNull(GraphQLString)},
            legs: {type: new GraphQLNonNull(GraphQLInt)}
        }
    },
    isTypeOf: obj=>obj.legs
})

const Fish = new GraphQLObjectType({
    name: 'Fish',
    description: '鱼儿实体',
    fields(){
        return {
            englishName: {type: new GraphQLNonNull(GraphQLString)},
            tailColor: {type: new GraphQLNonNull(GraphQLString)}
        }
    },
    isTypeOf: obj=>obj.tailColor
})

const Animal = new GraphQLUnionType({
    name: 'Animal',
    description: 'Union',
    types: [Dog,Fish],
    resolveType(obj){
        if(obj.legs){
            return Dog
        }else if(obj.tailColor){
            return Fish
        }else{
            return null
        }
    }
})

var animals=[
    {
        chinaName: '狗狗',
        legs: 4
    },
    {
        englishName: 'fish',
        tailColor:'red'
    },
];

const Query = new GraphQLObjectType({
    name: 'AnimalQuery',
    description: '动物信息查询',
    fields(){
        return {
            animals: {
                type: new GraphQLList(Animal),
                description: '查询全部动物列表',
                resolve:()=>{
                    return animals;
                }
            }
        }
    }
})

const schema = new GraphQLSchema({
    types: [Animal,Dog,Fish],
    query: Query
})
module.exports = schema