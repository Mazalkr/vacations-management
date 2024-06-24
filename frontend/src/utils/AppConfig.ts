class AppConfig {
    public baseUrl = 'http://localhost:8080/api';

    // auth url:
    public signupUrl = `${this.baseUrl}/signup`;
    public loginUrl = `${this.baseUrl}/login`;

    // vacations url:
    public vacationsUrl = `${this.baseUrl}/vacations`;
    public futureVacationsUrl = `${this.vacationsUrl}/future`;
    public activeVacationsUrl = `${this.vacationsUrl}/active`;
    public imagesUrl = `${this.vacationsUrl}/images`;
    public followersPerVacationUrl = `${this.vacationsUrl}/report`;
    public csvUrl = `${this.vacationsUrl}/report/csv`;

    // followers url:
    public followersUrl = `${this.baseUrl}/followers`;
    public followersByVacationsUrl = `${this.followersUrl}/vacations`;
    public vacationsByUserFollowing = `${this.followersByVacationsUrl}/users/isFollowing`;
    public vacationsExtendedUrl = `${this.followersByVacationsUrl}/extended/users`;
    public isFollowingUrl = `${this.vacationsByUserFollowing}`;

    public successNotificationDuration = 2000;
    public errorNotificationDuration = 6000;

    public limit = 9; // for pagination, 9 vacations per page (SPEC demand is 10).
}

const appConfig = new AppConfig();
export default appConfig;