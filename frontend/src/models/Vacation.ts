class Vacation {  
    public id?: string;
    public destination?: string;
    public startDate?: Date;
    public endDate?: Date;
    public price?: number;
    public description?: string;
    // public imageName?: string;
    public imageUrl?: string;  // in backend I used an util function to convert imageName to imageUrl.
    public image?: File;
}

export default Vacation;