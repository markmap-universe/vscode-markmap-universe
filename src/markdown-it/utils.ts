import { z } from 'zod'
import { fromError } from 'zod-validation-error'
import { logger } from '@/shared'

const frontmatterSchema = z.object({
    id: z.string().optional(),
    markmap: z.object({}).passthrough().optional().default({}),
    options: z.object({}).passthrough().optional().default({}),
})


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
    return parsedData.data as z.infer<typeof frontmatterSchema>
}
