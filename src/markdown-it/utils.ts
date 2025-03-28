import { z } from 'zod'
import { createHash } from 'node:crypto'
import { template as _template } from 'radashi'
import { fromError } from 'zod-validation-error'
import * as vscode from 'vscode'
import { logger } from '@/shared'

let counter = 0x39

export const resetCounter = () => { counter = 0x39 }

const frontmatterSchema = z.object({
    id: z.string().optional(),
    style: z.string().optional().default(""),
    options: z.object({}).passthrough().optional().default({}),
})

/**
 * Generate a short id from an identifier.
 * @param identifier The identifier to generate a short id.
 */
export const generateShortId = (identifier: string) =>
    `hmm-${counter++}${createHash('md5').update(identifier).digest('hex').slice(0, 8)}`

/**
 * Parse frontmatter with default values.
 * @param data The frontmatter data to parse.
 * @param identifier The identifier to generate a default id.
 */
export const parseFrontmatter = (data: Record<string, any> = {}, identifier: string) => {
    const parsedData = frontmatterSchema.safeParse(data)
    if (!parsedData.success) {
        const validationError = fromError(parsedData.error)
        logger.error(validationError.message)
    }
    if (parsedData.data && !parsedData.data.id) {
        parsedData.data.id = generateShortId(identifier)
    }
    return parsedData.data as Required<z.infer<typeof frontmatterSchema>>
}

/**
 * Replace data by name in template strings. 
 */
export const template = (
    str: string = "",
    data: Record<string, any>,
    regex: RegExp = /\$\{(.+?)\}/g
) => _template(str, data, regex)
