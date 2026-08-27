'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import {
    Award,
    Bot,
    BriefcaseBusiness,
    DatabaseZap,
    GraduationCap,
    Sparkles,
    Workflow,
    Wrench,
} from 'lucide-react';
import { CardPageConfig } from '@/types/page';

const iconMap = {
    award: Award,
    bot: Bot,
    briefcase: BriefcaseBusiness,
    knowledge: DatabaseZap,
    education: GraduationCap,
    automation: Sparkles,
    workflow: Workflow,
    skills: Wrench,
};

const markdownComponents = {
    p: ({ children }: React.ComponentProps<'p'>) => <p className="mb-3 last:mb-0">{children}</p>,
    ul: ({ children }: React.ComponentProps<'ul'>) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
    ol: ({ children }: React.ComponentProps<'ol'>) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
    li: ({ children }: React.ComponentProps<'li'>) => <li className="mb-1">{children}</li>,
    a: ({ ...props }) => (
        <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
        />
    ),
    blockquote: ({ children }: React.ComponentProps<'blockquote'>) => (
        <blockquote className="border-l-4 border-accent/50 pl-4 italic my-4 text-neutral-600 dark:text-neutral-500">
            {children}
        </blockquote>
    ),
    strong: ({ children }: React.ComponentProps<'strong'>) => <strong className="font-semibold text-primary">{children}</strong>,
    em: ({ children }: React.ComponentProps<'em'>) => <em className="italic">{children}</em>,
    code: ({ children }: React.ComponentProps<'code'>) => (
        <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[0.95em]">{children}</code>
    ),
};

export default function CardPage({ config, embedded = false }: { config: CardPageConfig; embedded?: boolean }) {
    const sections = config.items.reduce<Array<{ title: string; items: typeof config.items }>>((groups, item) => {
        const title = item.section || '';
        const existing = groups.find((group) => group.title === title);
        if (existing) {
            existing.items.push(item);
        } else {
            groups.push({ title, items: [item] });
        }
        return groups;
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className={embedded ? "mb-4" : "mb-8"}>
                <h1 className={`${embedded ? "text-2xl" : "text-4xl"} font-serif font-bold text-primary mb-4`}>{config.title}</h1>
                {config.description && (
                    <div className={`${embedded ? "text-base" : "text-lg"} text-neutral-600 dark:text-neutral-500 max-w-2xl leading-relaxed`}>
                        <ReactMarkdown components={markdownComponents}>
                            {config.description}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            <div className={embedded ? "space-y-7" : "space-y-12"}>
                {sections.map((section, sectionIndex) => (
                    <motion.section
                        key={section.title || sectionIndex}
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.12 }}
                        transition={{ duration: 0.55, delay: sectionIndex * 0.05 }}
                    >
                        {section.title && (
                            <div className="flex items-center gap-3 mb-5">
                                <span className="h-px w-8 bg-accent" />
                                <h2 className={`${embedded ? "text-xl" : "text-2xl"} font-serif font-bold text-primary`}>
                                    {section.title}
                                </h2>
                            </div>
                        )}

                        <div className={`grid gap-5 ${section.items.length > 1 ? "md:grid-cols-2" : ""}`}>
                            {section.items.map((item, index) => {
                                const Icon = item.icon ? iconMap[item.icon as keyof typeof iconMap] : undefined;
                                return (
                                    <motion.div
                                        key={`${section.title}-${item.title}-${index}`}
                                        initial={{ opacity: 0, y: 24, scale: 0.98 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        whileHover={{ y: -5 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 0.45, delay: index * 0.08 }}
                                        className={`group relative overflow-hidden bg-white dark:bg-neutral-900 ${embedded ? "p-4" : "p-6"} rounded-2xl shadow-sm border ${item.highlight ? "border-accent/50" : "border-neutral-200 dark:border-neutral-800"} hover:shadow-xl transition-shadow duration-300`}
                                    >
                                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-accent-light to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <div className="flex items-start justify-between gap-4 mb-4">
                                            <div className="min-w-0">
                                                <h3 className={`${embedded ? "text-lg" : "text-xl"} font-semibold text-primary`}>{item.title}</h3>
                                                {item.subtitle && (
                                                    <p className={`${embedded ? "text-sm" : "text-base"} text-accent font-medium mt-1`}>{item.subtitle}</p>
                                                )}
                                            </div>

                                            {item.image && (
                                                <motion.div
                                                    whileHover={{ scale: 1.06 }}
                                                    className="relative shrink-0 w-28 h-12 rounded-xl bg-neutral-50 dark:bg-neutral-800 p-2"
                                                >
                                                    <Image src={item.image} alt={`${item.subtitle || item.title} 标识`} fill className="object-contain p-2" />
                                                </motion.div>
                                            )}
                                            {!item.image && Icon && (
                                                <motion.div
                                                    whileHover={{ rotate: -6, scale: 1.08 }}
                                                    className="shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent"
                                                >
                                                    <Icon size={23} strokeWidth={1.8} />
                                                </motion.div>
                                            )}
                                        </div>

                                        {item.date && (
                                            <span className="inline-flex text-xs text-neutral-500 font-medium bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-full mb-4">
                                                {item.date}
                                            </span>
                                        )}
                                        {item.content && (
                                            <div className={`${embedded ? "text-sm" : "text-[0.95rem]"} text-neutral-600 dark:text-neutral-500 leading-relaxed`}>
                                                <ReactMarkdown components={markdownComponents}>
                                                    {item.content}
                                                </ReactMarkdown>
                                            </div>
                                        )}
                                        {item.tags && (
                                            <div className="flex flex-wrap gap-2 mt-5">
                                                {item.tags.map(tag => (
                                                    <span key={tag} className="text-xs text-neutral-500 bg-neutral-50 dark:bg-neutral-800/50 px-2.5 py-1 rounded-full border border-neutral-100 dark:border-neutral-800">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.section>
                ))}
            </div>
        </motion.div>
    );
}
