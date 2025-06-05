import Image from "next/image";
import React from "react";

export default function Certificate() {
  return (
    <div className="bg-[#14162F] text-white py-16 relative overflow-hidden my-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-[1fr_auto] gap-8 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold">
            Earn a certificate of completion
          </h2>
          <p className="text-gray-300 text-lg">
            Show your network you&spos;ve done the work by earning a certificate
            of completion for each course or path you finish.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-yellow-400 text-2xl">🏆</span>
              <div>
                <h3 className="font-semibold text-lg">Show proof</h3>
                <p className="text-gray-400">
                  Receive a certificate that demonstrates you&spos;ve completed
                  a course or path.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-purple-400 text-2xl">📚</span>
              <div>
                <h3 className="font-semibold text-lg">Build a collection</h3>
                <p className="text-gray-400">
                  The more courses and paths you complete, the more certificates
                  you collect.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-400 text-2xl">🌐</span>
              <div>
                <h3 className="font-semibold text-lg">
                  Share with your network
                </h3>
                <p className="text-gray-400">
                  Easily add certificates of completion to your LinkedIn profile
                  to share your accomplishments.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="w-[400px] h-[300px] bg-white rounded-lg shadow-xl p-6 rotate-3 transform hover:rotate-0 transition-transform">
            <Image
              width={200}
              height={200}
              src="/skillforge_black_logo.png"
              alt="Certificate Preview"
              className="h-8 mb-4"
            />
            <div className="space-y-4">
              <h4 className="text-2xl font-mono text-black">
                Certificate
                <br />
                of Completion
              </h4>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-gray-600 font-mono">Kathryn Washington</p>
                <p className="text-gray-800 font-mono font-bold mt-2">
                  Python 3
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(#ffffff 0.5px, transparent 0.5px)",
          backgroundSize: "15px 15px",
        }}
      />
    </div>
  );
}
