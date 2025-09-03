'use client'

import { useState } from 'react'
import { CopyCheck, CopyIcon, CopyMinus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type StatusType = 'idle' | 'copied' | 'failed'

export function CopyCodeButton({
  codeToCopy,
  className,
}: {
  codeToCopy: string
  className?: string
}) {
  const [status, setStatus] = useState<StatusType>('idle')

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeToCopy)
      setStatus('copied')
    } catch (err) {
      console.error('Failed to copy: ', err)
      setStatus('failed')
    }
    setTimeout(() => setStatus('idle'), 2000)
  }

  return (
    <Button
      className={cn(
        'text-foreground hover:text-foreground bg-background/80 supports-[backdrop-filter]:bg-background/60 shadow-sm backdrop-blur',
        'border-border animate-in h-8 gap-1.5 overflow-hidden rounded-full border',
        'opacity-60 hover:opacity-80',
        'transition-all duration-200 ease-in-out',
        'translate-x-[125%] group-hover:translate-x-0',
        'scale-0, group-hover:scale-100',
        className,
      )}
      variant="outline"
      onClick={copyToClipboard}
    >
      {status == 'idle' ? (
        <CopyIcon className="!size-4" />
      ) : status == 'copied' ? (
        <CopyCheck className="!size-4" />
      ) : (
        <CopyMinus className="!size-4" />
      )}

      {status == 'idle' ? 'Copy' : status == 'copied' ? 'Copied' : 'Failed'}
    </Button>
  )
}
