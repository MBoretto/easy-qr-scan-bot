// helpers.spec.js
import { describe, expect, test } from 'vitest'
import { prepareUrl } from '../helpers'

describe("helpers.js", () => {
    test("test prepareUrl function", () => {
        expect(prepareUrl("https://www.alink.com")).toStrictEqual({is_url: true, value: "https://www.alink.com"})
        expect(prepareUrl("http://www.alink.com")).toStrictEqual({is_url: true, value: "http://www.alink.com"})
        expect(prepareUrl("www.alink.com")).toStrictEqual({is_url: true, value: "http://www.alink.com"})
        expect(prepareUrl("alink.com")).toStrictEqual({is_url: true, value: "http://alink.com"})
        expect(prepareUrl("abcd")).toStrictEqual({is_url: false, value: "abcd"})
    });
});
