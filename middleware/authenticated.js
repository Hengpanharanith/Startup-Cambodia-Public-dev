export default function ({ store, redirect, route, $cookiz }) {
    let _TOKEN = $cookiz.get("access_token");
    if (!_TOKEN) return redirect("/");
}
