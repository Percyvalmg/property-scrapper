export function Response<T>(response: T): Promise<T> {
    return new Promise<T>(function (resolve) {
        resolve(response);
    });
}
