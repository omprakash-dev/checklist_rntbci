export interface TechCheckList {
    name: String,
    desc: String,
    dos: [{
        list: String,
        percentage: Number
    }],
    donts: [{
        list: String,
        percentage: Number
    }]
}