import React, { useState, useEffect, useRef } from 'react';
import { UIHeader } from './components/UIHeader';
import { BedroomStage } from './components/BedroomStage';
import { BoyfriendAvatar } from './components/BoyfriendAvatar';
import { SleekMicButton } from './components/SleekMicButton';
import { ParticleLayer } from './components/ParticleLayer';
import { SpeechBubble } from './components/SpeechBubble';
import { audioEngine } from './services/audioEngine';
import { voiceMimicEngine } from './services/voiceMimicEngine';

export function App() {
  // 1. Core State Hooks
  const [activeRoom, setActiveRoom] = useState('vent'); // 'vent' (Phase A) | 'healing' (Phase B)
  const [isMuted, setIsMuted] = useState(false);
  const [voiceProfile, setVoiceProfile] = useState('high');
  const [ventCombo, setVentCombo] = useState(0);

  // Resource Counter
  const [level] = useState(50);
  const [heartsCount, setHeartsCount] = useState(4000);

  // Animation & Gesture States
  const [isHeadDucking, setIsHeadDucking] = useState(false);
  const [showHeadOrbit, setShowHeadOrbit] = useState(false);
  const [isShirtRippling, setIsShirtRippling] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [slideOffset, setSlideOffset] = useState(0);
  const [borderFlatten, setBorderFlatten] = useState(false);

  // Talking Tom Reactions
  const [isSlapped, setIsSlapped] = useState(false);
  const [isTummyTickled, setIsTummyTickled] = useState(false);
  const [isToeTapped, setIsToeTapped] = useState(false);
  const [isPurring, setIsPurring] = useState(false);

  // Voice Mimic Engine State
  const [mimicState, setMimicState] = useState('idle');
  const [volumeLevel, setVolumeLevel] = useState(0);

  // Hair & Healing States
  const [hairSootLevel, setHairSootLevel] = useState(100);
  const [isHairClean, setIsHairClean] = useState(false);

  // Particles
  const [heartConfetti, setHeartConfetti] = useState([]);
  const [cursorTrail, setCursorTrail] = useState([]);
  const [sootParticles, setSootParticles] = useState([]);

  // Dynamic Name Resolution: Casual = Anajli | Formal = Anjalo
  const getUserName = (isFormal = false) => {
    return isFormal || voiceProfile === 'deep' ? 'Anjalo' : 'Anajli';
  };

  // Clean Speech Bubble Feedback
  const [speechMessage, setSpeechMessage] = useState("Hey Anajli! Press the mic to hear me repeat your voice! 💖");
  const [speechMood, setSpeechMood] = useState('happy');

  const dragStartXRef = useRef(0);
  const speechTimeoutRef = useRef(null);
  const lastBrushPosRef = useRef({ x: 0, y: 0 });
  const lastPetPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    audioEngine.setVoiceProfile(voiceProfile);
    if (voiceProfile === 'high') voiceMimicEngine.setPitch(1.55);
    else if (voiceProfile === 'deep') voiceMimicEngine.setPitch(0.8);
    else voiceMimicEngine.setPitch(1.15);
  }, [voiceProfile]);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioEngine.setMuted(nextMuted);
  };

  const showSpeech = (text, mood = 'happy', duration = 3000) => {
    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    setSpeechMessage(text);
    setSpeechMood(mood);
    speechTimeoutRef.current = setTimeout(() => {
      setSpeechMessage(null);
    }, duration);
  };

  // REAL VOICE MIMIC ENGINE
  const handleToggleMic = () => {
    const casualName = getUserName(false);
    const formalName = getUserName(true);

    if (mimicState === 'listening') {
      voiceMimicEngine.stopVoiceMimic();
      setMimicState('idle');
      showSpeech(`Voice recording stopped, ${casualName}!`, 'happy', 2000);
    } else {
      voiceMimicEngine.startVoiceMimic(
        (state) => {
          setMimicState(state);
          if (state === 'listening') {
            showSpeech(`👂 Listening to you, ${casualName}... Speak now!`, 'happy', 4000);
          } else if (state === 'mimicking') {
            showSpeech(`🗣️ Mimicking your voice, ${casualName}!`, 'happy', 4000);
          } else if (state === 'error') {
            showSpeech(`Pardon me, ${formalName}. Microphone permissions denied!`, 'shy', 3500);
          }
        },
        (vol) => {
          setVolumeLevel(vol);
        }
      );
    }
  };

  // CORE GESTURES ON CHARACTER TOUCH
  const handleHeadClick = (e) => {
    e.stopPropagation();
    if (activeRoom !== 'vent') return;

    audioEngine.playSound('tap_head');
    setIsHeadDucking(true);
    setShowHeadOrbit(true);
    setVentCombo((prev) => prev + 1);

    const casualName = getUserName(false);
    const responses = [
      `Hey ${casualName}! Watch the hair! 😅`,
      `Not the forehead, ${casualName}! 💥`,
      `Ouchie ${casualName}! Cute aggression overload? 🥺`,
      `Hey ${casualName}, I just styled this! 💇‍♂️`,
    ];
    showSpeech(responses[Math.floor(Math.random() * responses.length)], 'shy', 2500);

    setTimeout(() => setIsHeadDucking(false), 700);
    setTimeout(() => setShowHeadOrbit(false), 2400);
  };

  const handleCheekSlap = (e) => {
    e.stopPropagation();
    audioEngine.playSound('slap_cheek');
    setIsSlapped(true);
    setVentCombo((prev) => prev + 1);
    setHeartsCount((prev) => prev + 15);

    const formalName = getUserName(true);
    const slapLines = [
      `Pardon me, ${formalName}! Cheek slap! 👋💥`,
      `Whoa ${formalName}! My face! 😵`,
      `Slapped with love, ${formalName}? 😳`,
      `That stung, ${formalName}! Cute aggression! 💖`,
    ];
    showSpeech(slapLines[Math.floor(Math.random() * slapLines.length)], 'dizzy', 2200);

    setTimeout(() => setIsSlapped(false), 600);
  };

  const handleTummyTap = (e) => {
    e.stopPropagation();
    audioEngine.playSound('tummy_giggle');
    setIsTummyTickled(true);
    setVentCombo((prev) => prev + 1);
    setHeartsCount((prev) => prev + 10);

    const casualName = getUserName(false);
    const giggleLines = [
      `Hehehe ${casualName}! Ticklish! 🤭`,
      `Stop poking my belly, ${casualName}! 😂`,
      `Giggle overload, ${casualName}! 💖`,
      `Belly tickles, ${casualName}! 🙈`,
    ];
    showSpeech(giggleLines[Math.floor(Math.random() * giggleLines.length)], 'happy', 2200);

    setTimeout(() => setIsTummyTickled(false), 700);
  };

  const handleToeTap = (e) => {
    e.stopPropagation();
    audioEngine.playSound('toe_tap');
    setIsToeTapped(true);
    setVentCombo((prev) => prev + 1);

    const casualName = getUserName(false);
    const toeLines = [
      `Ow ${casualName}! My toes! 👟💥`,
      `Toe stub! Hop hop, ${casualName}! 🦶`,
      `Stepping on my sneakers, ${casualName}! 👟`,
      `Ouchie ${casualName}! My feet! 🥺`,
    ];
    showSpeech(toeLines[Math.floor(Math.random() * toeLines.length)], 'shy', 2200);

    setTimeout(() => setIsToeTapped(false), 700);
  };

  const handleChestPetMove = (e) => {
    const currentX = e.clientX;
    const currentY = e.clientY;
    const dist = Math.hypot(
      currentX - lastPetPosRef.current.x,
      currentY - lastPetPosRef.current.y
    );

    if (dist > 16) {
      lastPetPosRef.current = { x: currentX, y: currentY };
      if (!isPurring) {
        setIsPurring(true);
        audioEngine.playSound('purr');
        setHeartsCount((prev) => prev + 25);
        const casualName = getUserName(false);
        showSpeech(`Purrrrrr~ Loving the pets, ${casualName}! 💖🥰`, 'love', 2500);

        setHeartConfetti((prev) => [
          ...prev.slice(-30),
          {
            id: Date.now() + Math.random(),
            x: currentX,
            y: currentY,
            vx: (Math.random() - 0.5) * 40,
            vy: -40,
            rotate: 0,
            spin: 0,
            icon: '💖',
          },
        ]);

        setTimeout(() => setIsPurring(false), 1500);
      }
    }
  };

  const handleShirtClick = (e) => {
    e.stopPropagation();
    if (activeRoom !== 'vent') return;

    audioEngine.playSound('tap_shirt');
    setIsShirtRippling(true);
    setVentCombo((prev) => prev + 1);
    setHeartsCount((prev) => prev + 20);

    const clickX = e.clientX || window.innerWidth / 2;
    const clickY = e.clientY || window.innerHeight / 2;

    const newHearts = Array.from({ length: 18 }).map((_, i) => {
      const angle = (i / 18) * Math.PI * 2;
      const speed = 70 + Math.random() * 90;
      return {
        id: Date.now() + i + Math.random(),
        x: clickX,
        y: clickY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rotate: Math.random() * 360,
        spin: (Math.random() - 0.5) * 180,
        icon: Math.random() > 0.3 ? '💖' : '💋',
      };
    });

    setHeartConfetti((prev) => [...prev.slice(-40), ...newHearts]);

    const casualName = getUserName(false);
    const shirtLines = [
      `Honk honk ${casualName}! Squeak! 🐥`,
      `That's my Lipstick Batman shirt, ${casualName}! 🦇💖`,
      `Kiss mark activated, ${casualName}! 😘`,
      `Squeaky boyfriend mode for ${casualName}! 💗`,
    ];
    showSpeech(shirtLines[Math.floor(Math.random() * shirtLines.length)], 'happy', 2200);

    setTimeout(() => setIsShirtRippling(false), 600);
  };

  const handleDragStart = (e, info) => {
    dragStartXRef.current = info.point.x;
  };

  const handleDragEnd = (e, info) => {
    if (activeRoom !== 'vent') return;
    const deltaX = info.point.x - dragStartXRef.current;
    const velocityX = info.velocity.x;

    if (Math.abs(deltaX) > 40 || Math.abs(velocityX) > 150) {
      audioEngine.playSound('swipe_toss');
      const direction = deltaX > 0 ? 1 : -1;
      setIsSliding(true);
      setSlideOffset(direction * 260);
      setVentCombo((prev) => prev + 1);

      setTimeout(() => {
        setBorderFlatten(true);
        audioEngine.playWhooshAndThud(1);
      }, 180);

      setTimeout(() => {
        setBorderFlatten(false);
        setSlideOffset(0);
        setIsSliding(false);

        const formalName = getUserName(true);
        const tossLines = [
          `Whoooooa ${formalName}! Border bounce! 🤪`,
          `Slid right across the screen, ${formalName}! 🚀`,
          `Paper cutout mode activated, ${formalName}! 📄`,
          `I'm okay ${formalName}! Look at my goofy smile! 🤓`,
        ];
        showSpeech(tossLines[Math.floor(Math.random() * tossLines.length)], 'dizzy', 2500);
      }, 650);
    }
  };

  // HAIR CARE
  const handleHairHoverMove = (e) => {
    if (activeRoom !== 'healing' || isHairClean) return;

    const currentX = e.clientX;
    const currentY = e.clientY;
    const dist = Math.hypot(
      currentX - lastBrushPosRef.current.x,
      currentY - lastBrushPosRef.current.y
    );

    if (dist > 14) {
      lastBrushPosRef.current = { x: currentX, y: currentY };

      setHairSootLevel((prev) => {
        const nextLevel = Math.max(0, prev - 4);
        if (nextLevel === 0 && !isHairClean) {
          setIsHairClean(true);
          audioEngine.playSound('love_sign');
          audioEngine.playSound('kiss_blow');
          setHeartsCount((prev) => prev + 500);
          const casualName = getUserName(false);
          showSpeech(`I still love you, ${casualName}! 💖✨`, 'love', 6000);
        }
        return nextLevel;
      });

      audioEngine.playSound('soot_clean');

      setCursorTrail((prev) => [
        ...prev.slice(-15),
        {
          id: Date.now() + Math.random(),
          x: currentX,
          y: currentY,
        },
      ]);

      setSootParticles((prev) => [
        ...prev.slice(-15),
        {
          id: Date.now() + Math.random(),
          x: currentX + (Math.random() * 30 - 15),
          y: currentY + (Math.random() * 20 - 10),
        },
      ]);
    }
  };

  const handleBackgroundClick = () => {
    audioEngine.playSound('idle_click_miss');
  };

  const handleResetGame = () => {
    setVentCombo(0);
    setHairSootLevel(100);
    setIsHairClean(false);
    setIsHeadDucking(false);
    setShowHeadOrbit(false);
    setIsShirtRippling(false);
    setIsSliding(false);
    setSlideOffset(0);
    setBorderFlatten(false);
    setIsSlapped(false);
    setIsTummyTickled(false);
    setIsToeTapped(false);
    const formalName = getUserName(true);
    showSpeech(`Room reset complete for ${formalName}! 💖`, 'happy', 2500);
  };

  return (
    <div
      className="relative h-screen w-screen overflow-hidden select-none bg-slate-950 flex flex-col justify-between"
      onClick={handleBackgroundClick}
    >
      {/* 1. Full-Screen 100% Height Living Room Stage */}
      <BedroomStage activeRoom={activeRoom}>
        <BoyfriendAvatar
          activeRoom={activeRoom}
          animState={isSliding ? 'sliding' : isHeadDucking ? 'ducking' : 'idle'}
          isHeadDucking={isHeadDucking}
          isShirtRippling={isShirtRippling}
          isSliding={isSliding}
          slideOffset={slideOffset}
          borderFlatten={borderFlatten}
          hairSootLevel={hairSootLevel}
          isHairClean={isHairClean}
          isSlapped={isSlapped}
          isTummyTickled={isTummyTickled}
          isToeTapped={isToeTapped}
          isPurring={isPurring}
          isRepeatingVoice={mimicState === 'mimicking'}
          onHeadClick={handleHeadClick}
          onShirtClick={handleShirtClick}
          onCheekSlap={handleCheekSlap}
          onTummyTap={handleTummyTap}
          onToeTap={handleToeTap}
          onChestPetMove={handleChestPetMove}
          onHairHoverMove={handleHairHoverMove}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      </BedroomStage>

      {/* 2. Sleek Floating Top Header */}
      <UIHeader
        level={level}
        heartsCount={heartsCount}
        activeRoom={activeRoom}
        setActiveRoom={setActiveRoom}
        isMuted={isMuted}
        toggleMute={toggleMute}
        voiceProfile={voiceProfile}
        setVoiceProfile={setVoiceProfile}
        ventCombo={ventCombo}
        hairSootLevel={hairSootLevel}
        isHairClean={isHairClean}
        mimicState={mimicState}
        volumeLevel={volumeLevel}
        onResetGame={handleResetGame}
      />

      {/* Floating Speech Bubble */}
      <SpeechBubble message={speechMessage} mood={speechMood} />

      {/* 3. Single Sleek Floating Microphone Button */}
      <SleekMicButton mimicState={mimicState} onToggleMic={handleToggleMic} />

      {/* Particle Effect Overlay */}
      <ParticleLayer
        showHeadOrbit={showHeadOrbit}
        heartConfetti={heartConfetti}
        cursorTrail={cursorTrail}
        sootParticles={sootParticles}
      />
    </div>
  );
}

export default App;
