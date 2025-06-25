// Countdown timer component for price increase urgency
// Created: Professional countdown timer with urgency styling

'use client';

import { useCountdown } from '@/hooks/use-countdown';

interface CountdownTimerProps {
  targetDate: string;
  onExpired?: () => void;
}

export function CountdownTimer({ targetDate, onExpired }: CountdownTimerProps) {
  const { timeLeft, isExpired } = useCountdown(targetDate);

  if (isExpired) {
    onExpired?.();
  }

  return (
    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">
          ⚡ Price Increases Soon!
        </h3>
        <p className="text-sm mb-4">
          Save $100 - Early bird pricing ends in:
        </p>
        
        {!isExpired ? (
          <div className="flex justify-center items-center space-x-4">
            <div className="text-center">
              <div className="bg-white/20 rounded-lg px-3 py-2 min-w-[60px]">
                <div className="text-2xl font-bold">{timeLeft.days}</div>
                <div className="text-xs uppercase tracking-wide">Days</div>
              </div>
            </div>
            
            <div className="text-2xl font-bold">:</div>
            
            <div className="text-center">
              <div className="bg-white/20 rounded-lg px-3 py-2 min-w-[60px]">
                <div className="text-2xl font-bold">{timeLeft.hours}</div>
                <div className="text-xs uppercase tracking-wide">Hours</div>
              </div>
            </div>
            
            <div className="text-2xl font-bold">:</div>
            
            <div className="text-center">
              <div className="bg-white/20 rounded-lg px-3 py-2 min-w-[60px]">
                <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                <div className="text-xs uppercase tracking-wide">Min</div>
              </div>
            </div>
            
            <div className="text-2xl font-bold">:</div>
            
            <div className="text-center">
              <div className="bg-white/20 rounded-lg px-3 py-2 min-w-[60px]">
                <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                <div className="text-xs uppercase tracking-wide">Sec</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-xl font-bold">Price Increased!</div>
            <div className="text-sm">Now $397 (was $297)</div>
          </div>
        )}
        
        <p className="text-xs mt-4 opacity-90">
          {isExpired ? 'Regular pricing now in effect' : '$297 → $397 when timer reaches zero'}
        </p>
      </div>
    </div>
  );
}