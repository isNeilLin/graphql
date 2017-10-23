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

let users = [{
    name: '张三',
    sex: '男',
    intro: '前端',
    skills: ['html','css','javascript','nodejs'],
    stature: 180
},{
    name: '李四',
    sex: '女',
    intro: '后台',
    skills: ['linux','java','php','mysql'],
    stature: 180
}]

const Unit = new GraphQLEnumType({
    name: 'Unit',
    description: '单位',
    values: {
        MM: {value: 'MM'},
        cm: {value: 'cm'},
        mm: {value: 'mm'}
    }
})

const User = new GraphQLObjectType({
    name: 'User',
    description: '用户信息实体',
    fields: ()=>{
        return ({
            name: {
                type: new GraphQLNonNull(GraphQLString)
            },
            sex: {
                type: new GraphQLNonNull(GraphQLString)
            },
            intro: {
                type: new GraphQLNonNull(GraphQLString)
            },
            skills: {
                type: new GraphQLNonNull(new GraphQLList(GraphQLString))
            },
            stature: {
                type: GraphQLFloat,
                args: {
                    unit: {
                        type: Unit
                    }
                },
                resolve(user,{unit}){
                    if(unit==='MM'){
                        return user.stature/100;
                    }else if(unit==='cm'){
                        return user.stature/1;
                    }else if(unit==='mm'){
                        return user.stature*10;
                    }
                }
            }
        })
    }
})

const UserInput = new GraphQLInputObjectType({
    name: 'UserInput',
    description: '用户信息输入实体',
    fields(){
        return {
            name: {type:new GraphQLNonNull(GraphQLString)},
            sex: {type: new GraphQLNonNull(GraphQLString)},
            intro: {type: new GraphQLNonNull(GraphQLString)},
            skills: {type: new GraphQLNonNull(new GraphQLList(GraphQLString))},
            stature: {type: Unit}
        }
    }
})

const Query = new GraphQLObjectType({
    name: 'UserQuery',
    description: '用户信息查询',
    fields(){
        return {
            user: {
                type: User,
                description: '根据id查询单个用户',
                args: {
                    id: {type: new GraphQLNonNull(GraphQLInt)}
                },
                resolve(source,{id}){
                    console.log(source)
                    return users[id]
                }
            },
            users: {
                type: new GraphQLList(User),
                description: '查询全部用户列表',
                resolve(){
                    return users
                }
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'UserMutation',
    description: '用户信息维护',
    fields(){
        return {
            addUser: {
                type: User,
                description: '添加用户',
                args: {
                    name: {type: new GraphQLNonNull(GraphQLString)},
                    sex: {type: new GraphQLNonNull(GraphQLString)},
                    intro: {type: new GraphQLNonNull(GraphQLString)},
                    skills: {type: new GraphQLNonNull(new GraphQLList(GraphQLString))},
                    stature: {type: Unit}
                },
                resolve(source,{name,sex,intro,skills,stature}){
                    let user = {
                        name,
                        sex,
                        intro,
                        skills,
                        stature
                    }
                    users.push(user)
                    return user
                }
            },
            addUserByInput: {
                type: User,
                description: '通过Input添加用户',
                args: {
                    userInfo: {type: UserInput}
                },
                resolve(source,{userInfo}){
                    users.push(userInfo)
                    return userInfo
                }
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})

module.exports = schema;