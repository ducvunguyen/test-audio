import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing';
import {DomSanitizer} from '@angular/platform-browser';
declare var MediaRecorder: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mediaRecorder:any;
	chunks = [];
	audioFiles = [];
  urlFile = null;
	constructor(private cd: ChangeDetectorRef, private dom: DomSanitizer) {}
	ngOnInit() {
		
	}
	startRecording() {
    navigator.getUserMedia(
			{audio: true},
			stream => {
				this.mediaRecorder = new MediaRecorder(stream);
				this.mediaRecorder.onstop = e => {
					var blob = new Blob(this.chunks, {type: 'audio/ogg; codecs=opus'});
					this.chunks = [];
					var audioURL = URL.createObjectURL(blob);
					this.audioFiles.push(this.dom.bypassSecurityTrustUrl(audioURL));
					console.log(audioURL);
					console.log('recorder stopped');
          this.urlFile = audioURL;
					this.cd.detectChanges();
				};

        this.mediaRecorder.start();
          console.log(this.mediaRecorder);
          console.log('recorder started');

				this.mediaRecorder.ondataavailable = e => {
					this.chunks.push(e.data);
				};
			},
			() => {
				alert('Error capturing audio.');
			},
		);
	}

	stopRecording() {
		this.mediaRecorder.stop();
		console.log(this.mediaRecorder.state);
		console.log('recorder stopped');
	}

  dowloadAudio(event, audio){
    // event.href = this.urlFile;
    // event.download = this.urlFile;
    console.log(event);
    return audio.download;
    

  }
}
