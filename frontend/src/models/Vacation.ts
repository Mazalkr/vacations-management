class Vacation {  
    public id?: string;
    public destination?: string;
    public startDate?: Date | string;  // I add string for display it in EDIT FORM.
    public endDate?: Date | string;
    public price?: number;
    public description?: string;
    public imageName?: string;
    public imageUrl?: string;  // in backend I used an util function to convert imageName to imageUrl.
    public image?: File;

    public numberOfFollowers?: number;
    public isFollowing?: boolean;

    public totalVacations?: number;
}

export default Vacation;