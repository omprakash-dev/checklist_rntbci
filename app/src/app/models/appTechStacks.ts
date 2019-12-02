export interface AppTechStacks {
    name: string,
    techStacks: [{
        techName: String,
        dos: [{
            list: String,
            percentage: Number
        }],
        donts: [{
            list: String,
            percentage: Number
        }]
    }]
}