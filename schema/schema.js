const graphql = require("graphql");
const _ = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')
const Person = require('../models/bank/person')
const Problem = require('../models/bank/problem/problem')
const ExternalProblem = require('../models/bank/problem/externalProblem')

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;
// Example
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({ authorId: parent.id })
            }
        }
    })
})

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById(parent.authorId)
            }
        }
    })
})
// End of example
const PersonType = new GraphQLObjectType({
    name: 'Person',
    fields: () => ({
        id: { type: GraphQLID },
        projectId: { type: GraphQLID },
        name: { type: GraphQLString },
        role: { type: GraphQLString },
        avatar: { type: GraphQLString },
    })
})

const ProblemType = new GraphQLObjectType({
    name: 'Problem',
    fields: () => ({
        id: { type: GraphQLID },
        projectId: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
    })
})
const ExternalType = new GraphQLObjectType({
    name: 'External',
    fields: () => ({
        id: { type: GraphQLID },
        projectID: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        faq: { type: GraphQLString }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({})
            }
        },
        persons: {
            type: new GraphQLList(PersonType),
            resolve(parent, args) {
                return Person.find({})
            }
        },
        problems: {
            type: new GraphQLList(ProblemType),
            resolve(parent, args) {
                return Problem.find({})
            }
        },
        externalProblems: {
            type: new GraphQLList(ExternalType),
            resolve(parent, args) {
                return ExternalProblem.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save()
            }
        },
        addPerson: {
            type: PersonType,
            args: {
                projectId: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                role: { type: GraphQLString },
                avatar: { type: GraphQLString }
            },
            resolve(parent, args) {
                let person = new Person({
                    projectId: args.projectId,
                    name: args.name,
                    role: args.role,
                    avatar: args.avatar,
                })
                return person.save()
            }
        },
        updatePerson: {
            type: PersonType,
            args: {
                projectId: { type: new GraphQLNonNull(GraphQLID) },
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                role: { type: GraphQLString },
                avatar: { type: GraphQLString }
            },
            resolve(parent, args) {
                let person = Person.findById(args.id)
                if (args.name !== undefined) {
                    person.name = args.name
                }
                if (args.role !== undefined) {
                    person.role = args.role
                }
                if (args.avatar !== undefined) {
                    person.avatar = args.avatar
                }
                return Person.findByIdAndUpdate(
                    args.id,
                    { $set: { name: person.name, role: person.role, avatar: person.avatar } },
                    { new: true }
                )
            }
        },
        deletePerson: {
            type: PersonType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                return Person.findByIdAndDelete(args.id)
            }
        },
        addExternalProblem: {
            type: ExternalType,
            type: PersonType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                projectId: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
            },
            resolve(parent, args) {
                let problem = new Problem({
                    id: args.id,
                    projectId: args.projectId,
                    title: args.title,
                    description: args.description,
                })
                return problem.save()
            }

        }

    }
})

// const ProjectType = new GraphQlObjectType({
//     name: 'Project',
//     fields: {
//         crew: {
//             type: CrewType,
//             args: { id: { type: GraphQLString } }
//         }

//     }
// })


// const StagesType = new GraphQlObjectType({
//     name: 'Stages',
//     fields: () => ({
//         id: { type: GraphQLString },

//     })
// })

// const GoalType = new GraphQlObjectType({
//     name: 'Goal',
//     fields: () => ({
//         id: { type: GraphQLString },

//     })
// })

// const MVPType = new GraphQlObjectType({
//     name: 'MVP',
//     fields: () => ({
//         id: { type: GraphQLString },

//     })
// })

// const TDType = new GraphQlObjectType({
//     name: 'TD',
//     fields: () => ({
//         id: { type: GraphQLString },

//     })
// })

// const EconomicType = new GraphQlObjectType({
//     name: 'Economic',
//     fields: () => ({
//         id: { type: GraphQLString },

//     })
// })

// const PresentationType = new GraphQlObjectType({
//     name: 'Presentation',
//     fields: () => ({
//         id: { type: GraphQLString },

//     })
// })

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})