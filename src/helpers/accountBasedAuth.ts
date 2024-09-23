const { REACT_APP_AUTH_ADMIN,REACT_APP_AUTH_MEMBER,REACT_APP_AUTH_VIEWER } = process.env;

export default function (args: any) {
    if (args.includes(REACT_APP_AUTH_ADMIN)) {
        return 'admin'
    } else if (args.includes(REACT_APP_AUTH_MEMBER)) {
        return 'member'
    } else if (args.includes(REACT_APP_AUTH_VIEWER)) {
        return 'viewer'
    } else {
        return null
    }
}
