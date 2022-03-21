export class StringHelper {
    static isNullOrWhitespace(input: string | undefined): boolean {
        if (typeof input === 'undefined' || input == null) { return true; }
        return input.replace(/\s/g, '').length < 1;
    }
}
