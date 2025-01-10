import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import videojs from 'video.js';
@Component({
  selector: 'app-watch',
  standalone: true,
  imports: [],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css'
})
export class WatchComponent implements OnInit {
  @ViewChild('videoPlayer') videoElement!: ElementRef;

  videoUrl: string = 'https://www.w3schools.com/html/mov_bbb.mp4'; 
  player: any;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.player = videojs(this.videoElement.nativeElement, {
      controls: true,
      autoplay: true,
      preload: 'auto',
      sources: [{ src: this.videoUrl, type: 'video/mp4' }],
      controlBar: {
        children: [
          'playToggle',
          'currentTimeDisplay',
          'timeDivider',
          'durationDisplay',
          'progressControl',
          'volumePanel',
          'fullscreenToggle',
        ],

      }
    });

    this.player.on('play', () => {
      console.log('Video is playing');
    });

    this.player.on('pause', () => {
      console.log('Video is paused');
    });
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }
}
